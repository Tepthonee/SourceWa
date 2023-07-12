FROM quay.io/Tepthonee/Deploy:latest

RUN git clone https://github.com/Tepthonee/Deploy /railway/Raganork
WORKDIR /railway/Raganork
ENV TZ=Asia/Kolkata
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
