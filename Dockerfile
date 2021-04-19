FROM node:12.18

MAINTAINER RyunYeongKim <jiduckche.com@gmail.com>

VOLUME /deploy/JIDUCKCHE_CI-CD

COPY ./start.sh /usr/local/bin

WORKDIR public
RUN mkdir -p .well-known/acme-challenge
RUN ln -s /usr/local/bin/start.sh /start.sh

CMD ["start.sh"]