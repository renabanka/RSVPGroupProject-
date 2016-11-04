# RSVP_DatabaseProject
##By Rena Banka and Tina Rodriguez

#Approach:  This app is designed around the idea of Event Creation (i.e. birthday party, graduation party).
The user experience and expectations were taken into consideration when design app needs and flow.

#Technologies Used
This app employs:
   *"sessions" to uniquely identify the user's instance from login to logout and all event
related activity.
   *photo uploading ability via Base and Filereader
   *password hashing to mask user's password
   *organizing and storing users/events info in a SQL database that relates tables' contents back to user vua Bookshelf
       **a relational table is also utilized to crossmatch user and events to create a list in an all inclusive Events page
   *Handlebars to render all pages
   *routes/controllers/models are used to direct the data and user flow throughout app

#Unresolved Issue:
We were able to display attendee on a separate "My Event Attendance" page; but, we had wanted to display
all attendees along side their events on the "Home" page.