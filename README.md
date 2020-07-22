Steps to reproduce:
1. Replicate the Schema from the script in schema/schema.sql
2. Configure the connection string in database/db.js file
3. Start the nodemon server by running "npm run dev"

API endpoints:

1 Insert Tag -

.Method: POST 
Header: localhost:3000/api/insert_tag

Body Example:
{

	"title":"public"
	
}


2. Insert Bookmark -

Method: POST 
Header: localhost:3000/api/insert_bookmark

Body Example: 
{
	"title":"site",
	"publisher":"ram",
  "link":"www.something.com",
	"tags":["80ef02c6-8f10-46da-a6fa-b9e2239a0d0f"]
}


3. Update Tag -

.Method: PUT 
Header: localhost:3000/api/update_tags/:id

Body Example:
{
	"title":"public"
	
}

4. Update Bookmark -

Method: PUT 
Header: localhost:3000/api/update_bookmarks/:id

Body Example: 
{
	"title":"site",
	"publisher":"ram",
  "link":"www.sdasdad.com",
	"tags":["80ef02c6-8f10-46da-a6fa-b9e2239a0d0f"]
}


5. Delete Tag -

.Method: DELETE 
Header: localhost:3000/api/delete_tagss/:id



6. Delete Bookmark -

Method: DELETE 
Header: localhost:3000/api/delete_bookmarks/:id


7. Display Tags
Method: GET 
Header: localhost:3000/api/get_tags


8. Display Bookmarks
Method: GET 
Header: localhost:3000/api/get_bookmarks


 




