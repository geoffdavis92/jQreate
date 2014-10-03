# jQreate

### Description : 

**jQreate** is a simple JavaScript library, similar to jQuery but with a different base function. Whereas jQuery intereacts as a querying library, as its name implies, jQreate focuses on automating the process of creating elements and adding them to your document.

* **.capp**: appending variables holding elements, setting an `id`, and creating and initializing a `textNode`.

  ```javascript
      doc.capp(tagName, id, parent_id, text);
  ```
  * tagName = Name of the `element` you want to create
  * id = The `id` you want to set to the new element.
  * parend_id = The `id` of the parent element you want to append the new element to.
  * text = The displayed text that you want to set inside the new `element`'s `textNode`. 
* **.inner**: sets `innerHTML` of an element which has the passed `id`.

  ```javascript
      doc.inner(toSetId, code);
  ```
  * toSetId = `id` of the element that you want to edit the HTML of.
  * code = HTML code that you want to insert to the `innerHTML`

