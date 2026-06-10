const course=[
    {name:"HTML 5",
    category:"Frontend",
    placement:"top",
    description:"This is a beginner course on HTML",
   },
   {name:"CSS",
    category:"Frontend",
    placement:"bottom",
    description:"This is a beginner course on CSS",
   },
   {name:"Javascript",
    category:"Frontend",
    placement:"left",
    description:"This is a beginner course on Javascript",
   },
   {name:"React",
    category:"Frontend",
    placement:"right",
    description:"This is a beginner course on React",
   },
   {name:"Node Js",
    category:"Backend",
    placement:"top",
    description:"This is a beginner course on Node JS",
   },
   {name:"Express Js",
    category:"Backend",
    placement:"bottom",
    description:"This is a beginner course on Express JS",
   },
   {name:"SQL",
    category:"Database",
    placement:"left",
    description:"This is a beginner course on SQL",
   },
   {name:"MongoDB",
    category:"Database",
    placement:"right",
    description:"This is a beginner course on Mongodb",
   }
]
function showcourses(){
  
   let coursevalue=document.getElementById("course").value.toLowerCase();
    let categoryvalue=document.getElementById("category").value;
    console.log(coursevalue +" - "+categoryvalue);
   let filteredcourses=course.filter(course=>{
      let matchcourse=course.name.toLowerCase().includes(coursevalue);
      let matchcategory=categoryvalue===""||course.category===categoryvalue;
      return matchcourse&&matchcategory
   })
   let cards=""
   filteredcourses.forEach(course=>{
      cards+=`<div class=" card bgcard" data-bs-toggle="tooltip" data-bs-placement="${course.placement}"
       data-bs-title="${course.description}">
      <h3>${course.name}</h3>
      <p>${course.category}</p>
      </div>`;
   });

   document.getElementById("coursecards").innerHTML=cards;
   const toastElement=document.getElementById('liveToast');
   const toast =new bootstrap.Toast(toastElement);
   toast.show();
   const tooltiptrigger=document.querySelectorAll('[data-bs-toggle="tooltip"]');
   tooltiptrigger.forEach(el=>
      {
         new bootstrap.Tooltip(el);
      }
   );
}
function resetcourses(){
    document.getElementById("course").value="";
    document.getElementById("category").value="";
   //  document.getElementById("coursecards").innerHTML="";
   showcourses();
}

showcourses();