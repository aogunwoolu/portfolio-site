---
title: Database Creation With GORM & GraphQL
description: Playing wround with normalisation during the creation process of the database. Then going about implementing with an object relational model with Golang, and relating it to a GraphQL server. 
src: https://i.imgur.com/XAysqpa.png
author: Abisade Ogunwoolu
slug: database-gorm-and-gql
date: 2023-04-29
tags:
  - Database
  - GraphQL
  - MySQL
---

# **Schema Planning**

when analysing the database requirements, there was an attempt to create a full plan from establishing entities, then relationships between entities, and finally the attributes for each entity. Using the online [dbdiagram.io](https://dbdiagram.io/) site, the ERD (Entity Relationship Diagram) was created, and going through the normalisation steps, we managed to create a robust system and went forward with the implementation. However, this took a lot of time to do manually, so it was decided to create an automated tool that would generate the schema based on user input.

# **ERD Creation**

The first step was to identify the entities that would be included in the database. This was done by asking questions about what data needed to be stored, what entities this data belonged to and how they related to each other.

The next step was to achieve the first level of normalisation using the entities we have established. First normal form is a normal form that ensures that each attribute in a table can only contain values that are of the same type. First normal form is also known as first-order predicate logic and is a requirement for most relational databases.

We proceeded to achieve the second level of normalization, which involved satisfying two requirements. Firstly, the table must meet all the conditions of the first level of normalization, also known as first normal form. This ensures that each attribute in a table can only contain values of the same type. It is a prerequisite for most relational databases.

Secondly, we needed to ensure that all non-key attributes or columns were dependent on the key column(s). This means that each column in the table must be fully functionally dependent on the key column(s) or set of columns. In case the table has a composite primary key, we had to remove partial dependencies from the table.

The third normal form is the next level of normalization that we aim to achieve after satisfying the requirements of the first two levels. This level requires that all non-key attributes in the table are dependent only on the primary key column(s) and not on any other non-key attributes. In other words, every non-key column must be dependent only on the primary key column(s) and not on any other non-key columns. This eliminates transitive dependencies, which can lead to data inconsistencies and anomalies. Achieving the third normal form helps to ensure data consistency, accuracy, and efficiency in a relational database.

![normalisation](https://i.imgur.com/kL1Z94N.png)

Then we created a diagram that showed all of the entities and their attributes. Creating a diagram that shows all of the entities and their attributes is an important step in database design. The diagram provides a visual representation of the relationships between different entities and the attributes associated with them. It helps to organize the data into a structured format that is easy to understand and maintain.

To create the diagram, we first identified all of the entities in the database and their corresponding attributes. We then created a visual representation of each entity and its attributes using standardized symbols and notations. We also established the relationships between different entities by using lines and arrows to connect them.

By having a clear and concise diagram, we could easily visualize the structure of the database and ensure that all of the relationships and dependencies between entities were properly defined. This helps to prevent data inconsistencies and anomalies, and ensures that the database operates efficiently and accurately. The diagram also serves as a useful reference tool for developers and other stakeholders who need to understand the structure of the database.

# **GORM & GraphQL**
GORM (Go Object Relational Mapping) is a popular Object Relational Mapping library for Go programming language. It provides a simple and efficient way to interact with relational databases. GraphQL is a query language for APIs that provides a powerful and flexible way to retrieve data from the server. Together, they offer a powerful solution for building robust and efficient database systems.

![GraphQL vs REST](https://i.imgur.com/dy13DA5.png)

To implement a database with GORM and GraphQL, we first define the schema for our GraphQL API. This schema describes the types and fields available in our API, and serves as a contract between the client and the server. We then use GORM to define the models for our database tables. These models represent the entities and relationships in our database and provide an easy way to interact with the database.

Next, we create resolvers for each field in our GraphQL schema. These resolvers define how the server should retrieve and manipulate the data for each field. We use GORM to interact with the database and retrieve the necessary data.

Once we have defined our resolvers, we can start our GraphQL server and begin interacting with our database using GraphQL queries and mutations. GraphQL provides a flexible way to retrieve data from the server, allowing clients to request only the data they need, in the format they need it. GORM makes it easy to interact with the database, handling complex queries and relationships in a simple and efficient way.

Overall, implementing a database with GORM and GraphQL provides a powerful and flexible solution for building efficient and scalable database systems. By leveraging the strengths of both technologies, we can create robust and efficient applications that provide a seamless user experience.