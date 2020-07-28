// Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}




// UI Constuctor
function UI() {}
UI.prototype.addBooklist = function(book){
    const list = document.getElementById('book-list');
    //?Create tr element
    const row = document.createElement('tr');
    //? Insert cols
    //Using innerHTML we are able the write the inner HTML content of it
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
}
UI.prototype.ClearFields = function(){
    document.getElementById('title').value ='';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
// Delete book
UI.prototype.DeleteBook = function(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
}
//Clear FIelds
// Show Alert
UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
  
    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

// *Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){ 
    //?Get form values
    const title = document.getElementById('title').value,
           author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value;
    //?Checking the values of the constants
    // ?console.log(title,author,isbn);
    //I*nstantiate book
    const book = new Book(title,author,isbn);
  
    //? Displaying the book object  
    //?console.log(book);
   

    //? Instantiate UI
    const ui = new UI();
    //Validating 
    if(title === '' || author === '' || isbn === ''){
        // alert('Failed');
        ui.showAlert('Please fill in all fields','error');
    }else{
          //? Add book to list
           ui.addBooklist(book);
             // * showing the alert for adding a book
           ui.showAlert("Your book is successfully added ","success");

         //? Clearing the values in the input tags
            ui.ClearFields();
    }
  
    
    e.preventDefault();})
    //*Event Listerners for delete
    document.getElementById('book-list').addEventListener('click',function(e){
        const ui = new UI();
        //Deleting book
        ui.DeleteBook(e.target);
        //show alert
        ui.showAlert('Book delete','remove');
        e.preventDefault();
    })