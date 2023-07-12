FROM node:lts-buster:latest

RUN git clone https://github.com/Tepthonee/SourceWa /railway/Raganork
WORKDIR /railway/Raganork
ENV TZ=Asia/Amman
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
