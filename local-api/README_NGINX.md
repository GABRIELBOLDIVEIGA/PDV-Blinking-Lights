## EC2
```bash
$ ssh -i ./certs/chave-aws-ec2.pem ubuntu@IP_DO_SERVIDOR
```

## Configurando NGINX 

* instalar nginx
```bash
$ sudo apt-get install nginx
```
```bash
$ sudo unlink /etc/ngix/sites-enabled/default
```
```bash
$ sudo vi /etc/ngix/sites-available/NOME_DO_PROJETO.conf
```
```code
server {
  listen 80;
  listen [::]:80;
  server_name DOMINIO_UTILIZADO;

  access_log /var/log/nginx/gn-pab.log;
  error_log /var/log/nginx/gn-pab.log;
  
  location / {
    proxy_pass htttp://127.0.0.1:8000;
  }
}
```
```bash
$ sudo ln -s /etc/nginx/sites-available/NOME_DO_PROJETO.conf /etc/ngix/sites-enabled/NOME_DO_PROJETO.conf
```
```bash
$ sudo nginx -f # verifica as configuracoes do nginx
```
```bash
$ sudo systemctl restart nginx # reinicia o nginx
```


```code
server {
  listen [::]:443 ssl ipv6only=on;
  listen 443 ssl;
  ssl_certificate server_ssl.crt.pem;
  ssl_certificate_key server_ssl.key.pem;
  ssl_client_certificate /home/ubuntu/PASTA_DO_PROJETO/certs/chain-pix-prod.crt;
  ssl_verify_client optional;
  ssl_verify_depth 3;
  
  location /webhook {
    if ($ssl_client_verify != SUCCESS) {
      return 403;
    }
    proxy_pass htttp://127.0.0.1:8000;
  }

  location / {
    proxy_pass htttp://127.0.0.1:8000;
  }
}
```