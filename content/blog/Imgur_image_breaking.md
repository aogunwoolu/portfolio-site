---
title: Imgur Image Breaking and Fixing It
description: Imgur is a popular image hosting platform that allows users to upload and share images. However, because of recent region restrictions, i've been experiencing issues with images not loading properly on my website. In this blog post, I will share my experience with the Imgur image breaking issue and how I fixed it.
src: /thumbnails/imgur.png
author: Abisade Ogunwoolu
slug: imgur-image-breaking
date: 2026-05-14
tags:
  - images
  - imgur
  - breaking
---

# **Introduction**
Imgur is a popular image hosting platform that allows users to upload and share images. However, due to [recent region restrictions](https://help.imgur.com/hc/en-us/articles/41592665292443-Imgur-access-in-the-United-Kingdom), I have been experiencing issues with images not loading properly on my website.

![Imgur Image Breaking](../images/blog/imgur-image-breaking/1.png)

# **The Issue**
The issue was that the images hosted on Imgur were not loading for users in the United Kingdom. This was a major problem for my website, as I rely on Imgur to host my images. I had to find a solution to this problem quickly, as it was affecting the user experience on my website.

> From September 30, 2025, access to Imgur from the United Kingdom is no longer available. UK users will not be able to log in, view content, or upload images. Imgur content embedded on third-party sites will not display for UK users.
>
>You can exercise your data protection rights without logging in (for example, to request a copy of your data or deletion) using our Help Center request form. 

# **The Solution**
After doing some research, I found that the solution was to just host the images on this website instead of Imgur. This was a simple solution that allowed me to bypass the region restrictions and ensure that my images were loading properly for all users while having less reliance on third party services. I uploaded the images to my website and updated most of the image URLs in my code to point to the new location.

I used `gatsby-remark-images` to allow me to access the images in my markdown files and optimise them for better performance. This plugin allows me to specify the maximum width of the images, which helps to ensure that they are displayed correctly on different screen sizes. I configured it like this:

```js
# gatsby-config.js
...
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        rehypePlugins: [
          [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
        ],
        remarkPlugins: [],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ],
        extensions: ['.mdx', '.md'],
      },
    },
...
```