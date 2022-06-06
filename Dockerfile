FROM node:14.17.4-stretch
RUN mkdir /lalu_soap
COPY /lalu_soap_src /lalu_soap

WORKDIR /lalu_soap
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]