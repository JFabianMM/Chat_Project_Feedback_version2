FROM --platform=linux/amd64 node:18

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 4002

CMD ["node", "/home/app/src/index.js"]