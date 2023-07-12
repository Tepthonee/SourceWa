FROM node:lts-buster

RUN git clone https://github.com/Tepthonee/SourceWa /Tepthonee
WORKDIR 8000
ENV TZ=Asia/Baghdad
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
