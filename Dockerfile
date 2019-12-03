FROM node

LABEL maintainer="bucai<1450941858@qq.com>"

ADD . /app/

WORKDIR /app

RUN yarn

EXPOSE 2293

CMD ["yarn", "start"]
