FROM node:lts-buster

RUN git clone https://github.com/Tepthonee/SourceWa /skl/Tepthon
WORKDIR /skl/Tepthon
ENV TZ=Asia/Amman
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]