# Fullstack-HobbyApp

Technologies: Vanilla JS, Node, MongoDB

The app is a Hobby Database. You can add, delete, edit and view the hobbies. All the CRUD functionalities are available, including many others.

## Functionalities

- To see all hobbies listed on the left
- Filter only indoor or outdoor hobbies or both
- Add a new hobby
- Edit a hobby
- Delete a hobby
- "Log in"
- "Log out"
- Add a new hobby to user's own hobbies
- Add to the practice count of a user's own hobby
- Adding an empty hobby is prevented
- Username and password are checked from the database, so one can't log in with faulty credentials

## The view when not logged in

You can add a new hobby even when not logged in because it adds to the database, and doesn't take anything away from others.

![Front page, not signed in](https://student.labranet.jamk.fi/~p0033/fullstackfs/src/fp1.png)

## The view logged in

The hobbies get a button called "Lisää omiin" meaning "add to your own". By clicking the button, the specific hobby is added to the user's own hobbies list on 

the right. You can click "Lisää harrastuskerta" to add to the times you've practiced said hobby.

![Signed in](https://student.labranet.jamk.fi/~p0033/fullstackfs/src/fp2.png)

## The view logged in with editing and delete privileges

When logged in with editing and delete privileges, you can edit and delete hobbies on the left.

![ope](https://student.labranet.jamk.fi/~p0033/fullstackfs/src/fp25.png)
