---
title: Gatsby Development
description: My Journey through developing this website through Gatsby, this includes frontend logic, styling, databases and the general Gatsby annoyances. Join me on my path to creating the very website you read this on.
src: https://i.imgur.com/96NgPIc.png
author: Abisade Ogunwoolu
slug: gatsby-development
date: 2023-04-12
tags:
  - React
  - GraphQL
  - MongoDB
---

# **The Frontend**
---
I began knowing very little about the technology that I was working with. This was both exciting and frightening. I started with the basics: **the visuals**. This was done by first planning the very basics of the site using the [Figma Project](https://www.figma.com/file/ZI33nTAw5zaKncs89bsOlw/portfolio-site?node-id=0%3A1&t=P7Unn6dNFH2z3zVa-1). This took a little while but the final result was something I was fairly happy with for the first version.

![Design Plan for the Main Page](https://i.imgur.com/PlztlSR.png)

The first draft of the website is very similar to the currenrt implementation, with the contact me button the gradient and the background all being main features that were implemented. The bolder Resume link aand the links on the _bottom lefthand corner_ were features that were skipped over for now but could be picked up in the future depending on my thoughts in the future. 

Some highlights of CSS include:
1. The `flashy button` implementation:
```css
.btn-flat {
	display: table;
	width: 200px;
	height: 50px;
	text-align: center;
	background:
	linear-gradient(rgb(0, 0, 0),rgb(0, 0, 0)) padding-box,
	linear-gradient(45deg, #bd12fa, #8901ff, #5101fe) border-box;
	color: #313149;
	padding:2px;
	border: 1px solid transparent;
	border-radius:50px;
	display:inline-block;
	background-origin: border-box;
	background-clip: content-box, border-box;
	display: block;
	margin: 0 9px 0 9px;
	color: #ffffff;
	font-weight:500;
	font-size: 20px;
	transition: background-position 0.2s ease-in-out;
	background-size: 200% 100%; 
	background-position: right center;
}

.btn-flat:hover {
  background-position: left center; 
  color: #a0a0a0;
}
```
2. The background
```css
.nebula_img{
	background-image: url('../../static/mainbg.png');
	background-size: cover;
	background-position:center;
	display: flex;
	align-items: center;
}
```
after this, The implmentation of the next sections was done. These won't be shown here as they were not as much of a hurdle as the main page for me. This all resulted in the frontend static website you can see. There are items that I could not managed to implement with the frontend (`custom mouse icon`,  `animations`), but some of these will be tackled in the future! 

# **The deployment**
---
After developing the inital frontend, I moved on to selecting the CI/CD solution. I didn't think it was necessary to make a bespoke solution and I had heard of things such as [vercel](https://vercel.com/), [Gatsby cloud](https://www.gatsbyjs.com/), etc. which allow free hosting for hobbyists. So I began with the first solution I had in mind: **vercel**
 ![vercel](https://i.imgur.com/0vytU2y.gif)
When trying to deploy to vercel, the solution worked very well initially. This had me using React 16 which is the most recent version that's supported by vercel at this moment in time. At that time, there was no reason to upgrade to the most recent React 18 but in the future there was an issue that would arise requiring an upgrade. 

This issue would come in the form of the use of Gatsby's GraphQL local file plugin which allowed for access to local files via a GraphQL API. As this plugin required an update to React 18, it was clear that vercel was no longer suitable for the deployment of the site. this meant I would need to find something, and luckily I had a backup:
**Gatsby cloud**:
![Gatsby cloud]()
This managed CI/CD solution was very similar to vercel, so there was little issue setting it up to build upon push to main. The only issue came with transferring the DNS and web address to Gatsby cloud. However, after following the steps disclosed on their website I managed to fully transfer everything and achieved a fully hosted website.

# **The backend**
---
An important part of the site I wanted to implement was the blogging aspect, this is because I wanted to show my journey of learning and interest in technologies. this meant first researching into how possible this was, and then how I could implement it within the Gatsby framework.

through research I discovered a number of ways to implement it using Gatsby's built in GraphQL integration. One of these being MongoDB integration and the other being local markdown storage. both of these solutions are viable, so I began to experiment with the creation of the MongoDB solution utilising the MongoDB Atlas. I logged into the managed Atlas server and created a free tier hobbyist database where I created my first MongoDB database. After putting some test data into said database, I then set out to create the GraphQL connection in my Gatsby application. this was fairly straightforward, requiring the `connection string`, `username` and `password` like most database connection is. after this I could successfully query the database and use this data on the webpage.

However, I wanted to experiment with the alternative and so I went about developing the markdown solution. while going down this rabbit hole, I discovered the [MDX/Markdown X](https://mdxjs.com/) technology which allowed for JSX items to be used within markdown (extending on the HTML inclusion in MD). I put that aside but intend to play around with it in the future. I continued to implement the basic markdown plugin for Gatsby, and tested it with the first post. this was successful and can be extended in the future using the MDX framework. 

I concluded that the MongoDB was overkill for the requirements of a simple blog, and writing markdown is a lot more accessible than creating a JSON object every time I wanted to create a post. However, there is certainly opportunity to extend this functionality to make use of a DB in the future if need be.