# jQreate
=======

## Brief : 

JavaScript Library, requires jQuery.

## Description : 

Whereas jQuery intereacts as a querying library, as its name implies, jQreate focuses on automating the process of creating elements and adding them to your document.

* **.capp**: appending variables holding elements, setting an `id`, and creating and initializing a `textNode`.
  ```javascript
      doc.capp(*tagName, id, parID, txt*);
  ```
 * tagName = Name of the `element` you want to create
 * id = The `id` you want to set to the new element.
 * parID = The `id` of the parent element you want to append the new element to.
 * txt = The displayed text that you want to set inside the new `element`'s `textNode`. 
* **.inner**: sets `innerHTML` of an element which has the passed `id`.
  ```javascript
      doc.inner(*toSetId, code*);
  ```

