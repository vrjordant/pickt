(function() {
  function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };
    image.src = URL.createObjectURL(url);
    document.body.appendChild(image);
}
    const formID = document.getElementById("formID");
  
    if (formID) {
      const uploadThis = document.getElementById("picture");
  
      const errorContainer = document.getElementById("error-container");
      const errorTextElement = errorContainer.getElementsByClassName(
        "text-goes-here"
      )[0];

      // We can take advantage of functional scoping; our event listener has access to its outer functional scope
      // This means that these variables are accessible in our callback
      formID.addEventListener("submit", event => {
        event.preventDefault();
        try {
          // let str = uploadThis.value.replace(/^.*\\/, "");

          errorContainer.classList.add("hidden");
          getDataUri(uploadThis.files[0], function(dataUri) {
            console.log(dataUri);
          })
  
        } catch (e) {
          const message = typeof e === "string" ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.classList.remove("hidden");
        }
      });
    }
  })();
  
  