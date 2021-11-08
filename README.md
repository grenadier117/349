# CPSC 349 Project 1 - Pet Dates

This completed project is published and can be viewed [here](http://349.gonecoding.io/)

## Installation
Dependencies: Node >= 14.0.0 and npm >= 5.6

run ```npm install``` to install all dependencies for the project

run ```npm start``` to start development server

navigate to http://localhost:3000

## Usage

The default page is your calendar view set to "Month".
* Add Event
  * Double click on a day and enter your title, start date, and end date. Then click "Add".
  * While in "Week" or "Day" view, drag along the time period you wish your event to take place and fill out event details.
* View Event
  * Click on an existing event in the calendar to view the details.
* Delete Event
  * Click on an existing event in the calendar to view the details, then click the "Delete" button at the bottom of the modal.

## HISTORY

TypeScript is a programming language which was developed by Microsoft. It was launched for public use in October 2012. It is free, open source and superset of the JavaScript. Maintained by Microsoft, the language comes with an addition of class-based object oriented programming, as well as optional static typing to the JavaScript.<span class="asterick">*</span> It is possible to create JavaScript applications for client or server side using the TypeScript.

###### *Wikipedia. "Typescript"

### LEARNED

It was a great opportunity to work with a great mind (<span>Thank you, Jake!</span>). He was patience in showing and sharing something new to me (`TypeScript`). The appreciation for Jake goes to how he processed the information. It showed me that it is not about trying to remember everything that I learned from coding, but remembering where and how to implement it into the coding/project. The internet is full of `free Source Code` and an explanation of how to implement it into our projects (Firebase being one source of reference).

### TypeScript is based on types

```tsx
function greeter(person: string) {
 return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

- the parameter `person` is given the `type`: `string`
- in this way, a number cannot be applied

---

## CRUD Calendar (Month)

![CRUD Calendar](./public/img/pix2.png)

---

## CRUD Calendar (Week)

![CRUD Calendar](./public/img/pix1.png)

---

## CRUD Calendar (Day)

![CRUD Calendar](./public/img/pix3.png)

---

Authored by: Jake Hamo and Terrell D Lemons
