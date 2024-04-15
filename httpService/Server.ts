import * as http from 'http';
import { URL } from 'url';
import * as path from 'path';
import * as fs from 'fs';

type RequestListener = (query: Object, body?: Object) => Promise<any>;
type RouteHandler = (query: Object) => Promise<any>;

export class HttpServer {
  private server: http.Server;
  private routes: { [key: string]: RouteHandler };
  private staticDir: string;

  constructor(staticDir: string) {
    this.staticDir = staticDir;
    this.server = http.createServer((req, res) => {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const path = url.pathname;
      const query = Object.fromEntries(url.searchParams.entries());
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        if (req.method === 'GET' || req.method === 'POST') {
          this.handleRequest(req.method, path, query, body, res);
        } else {
          res.statusCode = 405; // Method Not Allowed
          res.end();
        }
      });
    });

    this.routes = {};
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }

  router(method: string, path: string, handler: RouteHandler) {
    const key = `${method}:${path}/`; // Add a slash at the end of the path
    this.routes[key] = handler;
  }

  private async handleRequest(method: string, path: string, query: Object, body: string, res: http.ServerResponse) {
    if (path.startsWith('/__bit')) {
      const newUrl = `http://127.0.0.1:54345${path.replace('/__bit', '')}`;
      this.proxyRequest(method, newUrl, query, body, res);
    } else {
      const key = `${method}:${path}/`; // Add a slash at the end of the path
      const handler = this.routes[key];
      if (handler) {
        try {
          const requestBody = body.trim() ? JSON.parse(body) : {}; // Parse JSON only if body is not empty
          const result = await handler(Object.assign(query, requestBody));
          if (!res.headersSent) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          }
        } catch (error) {
          console.error(error);
          res.statusCode = 500; // Internal Server Error
          res.end();
        }
      } else {
        this.serveStaticFile(path, res);
      }
    }
  }

  private proxyRequest(method: string, newUrl: string, query: Object, body: string, res: http.ServerResponse) {
    const requestOptions: http.RequestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const proxyReq = http.request(newUrl, requestOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error(err);
      res.statusCode = 500; // Internal Server Error
      res.end();
    });

    proxyReq.end(body);
  }

  private serveStaticFile(filePath: string, res: http.ServerResponse) {
    const fullPath = path.join(this.staticDir, filePath);
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.statusCode = 404; // Not Found
        res.end();
      } else {
        const contentType = this.getContentType(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  }

  private getContentType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      case '.json':
        return 'application/json';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }
}