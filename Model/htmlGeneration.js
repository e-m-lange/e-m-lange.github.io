//Return a "tagname" HTML element with its attributes and children
function createElement(tagname, attributes, children){
    //Create a "tagname" HTML element
    var element = document.createElement(tagname);
  
    //Add its attributes 
    for (key in attributes){
      element.setAttribute(key, attributes.key);
    }
  
    //Add the children to the element
    if (children){
      for (child of children){
        if (child instanceof HTMLElement){
          element.appendChild(child);
        } else {
          //Create a plain text node if the child is not an HTML element
          element.appendChild(document.createTextNode(child));
        }
      }
    }
    return element;
  }