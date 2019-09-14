server {
	listen 80;
	listen [::]:80;

	root /home/jake/www/hw02;

	index index.html;

	server_name hw02.paperdogg.com;

	location / {
		try_files $uri $uri/ =404;
	}

}


