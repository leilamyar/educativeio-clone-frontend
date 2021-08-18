// const fetchCourse = async(courseId) => {
//   const courses = fetch('../../data/courses.mock.json')
//   .then(response => response.json())
//   .then(data => console.log(`courses fetched:${courseId}:`, data));

//   return courses;
// };

// fetchCourse('hardcoded course id in js file');

// TODO : fix CORS error - study Fetch API & HTTP doc on MDN

// Fake js object to mock courses - to be replaced with fetch above

// joined data
const fetchedContent = [
  { 
    chapTitle: "Async JS Intro",
    content: [
    { title: "Intro", content: "lorem ipsumdolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" }, 
    { title: "Example", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." }, 
    { title: "Issue with async code", content: "lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" },
    ],
  },
  {
    chapTitle: "Using Promises",
    content: [
    { title: "What we're trying to achieve", content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" }, 
    { title: "Let's code : Promises in action", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." },
    ],
  },
  {
    chapTitle: "Using Async Await",
    content: [
    { title: "Issue using Promises", content: "lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel." }, 
    { title: "Let's code: Async Await in action", content: "lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, animi eaque rerum amet quibusdam et possimus!" },
    ],
  },
  {
    chapTitle: "Conclusion",
    content: [ 
      { title: "", content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel."} ],
  },
];

const createCourseArticle = (partTitle, partContent) => {
  // TODO: add subparts display + (mock) data
  
  const articleTitleEl = document.createElement('h4');
  articleTitleEl.innerText = partTitle;
  
  const contentEl = document.createElement('p');
  contentEl.innerText = partContent;  
  
  const sectionContainer = document.createElement('section');
  sectionContainer.className += 'course-content';
  sectionContainer.appendChild(contentEl);
  
  return [
    articleTitleEl,
    sectionContainer,
  ];
};

const createPartElements = (partObj, partId) => {
  const partTitleEl = document.createElement('h4');
  const partTitleLink = document.createElement('a');

  partTitleEl.id = partId;
  partTitleEl.className += 'menu-part';
  partTitleLink.innerText = partObj.title;
  
  partTitleEl.setAttribute('data-part-content', partObj.content);
  partTitleLink.addEventListener('click', function(e) { // FIXME: rm this if not used / check what it is
    e.preventDefault();
    const contentContainer = document.querySelector('.chap-content-container');
    // contentContainer.removeChild('???'); 
    // FIXME: article are not removed when new part link is clicked

    const [title, content] = createCourseArticle(partObj.title, partObj.content);
    contentContainer.appendChild(title);
    contentContainer.appendChild(content);
    // console(partTitleLink);
    // console(partTitleEl);
  });
  partTitleEl.appendChild(partTitleLink);
  return partTitleEl;
};

const makeChapContainerForMenu = (chapter) => {
  
  const chapContainer = document.createElement('div');
  const chapTitleEl = document.createElement('h3')
  const toggleBtn = document.createElement('button');
  const toggablePartsContainer = document.createElement('div');
  
  const chapParts = chapter.content.map((cc, i) => {
    return createPartElements(cc, `${chapter.chapTitle}-${i}`);
  });

  chapContainer.className += ('chap-container');
  chapTitleEl.innerText += chapter.chapTitle;
  toggablePartsContainer.className += 'toggable-parts-container';
  toggablePartsContainer.setAttribute('data-is-toggled', false);


  toggleBtn.className += 'toggle-btn';
  toggleBtn.innerText = 'Toggle'; // TODO: replace with arrow icon
  toggleBtn.addEventListener('click', () => {
    if(toggablePartsContainer.dataset.isToggled != 'true') {
      // console.log(toggablePartsContainer)
      chapParts.forEach((cp) => {
        toggablePartsContainer.dataset.isToggled = 'true';
        toggablePartsContainer.appendChild(cp);
      });
    } else {
      chapParts.forEach((cp) => {
        toggablePartsContainer.dataset.isToggled = 'false';
        toggablePartsContainer.removeChild(cp)
      });
    };
  });

  chapContainer.appendChild(chapTitleEl);
  chapContainer.appendChild(toggleBtn);
  chapContainer.appendChild(toggablePartsContainer);

  return chapContainer;
};

document.addEventListener("readystatechange", (e) => { //see tjs book p. 184
  if(document.readyState == "interactive") {
    const courseMenu = document.querySelector('.course-menu');
    
    // fetch data here
    fetchedContent
      .map((c) => makeChapContainerForMenu(c))
      .forEach((cc) => courseMenu.appendChild(cc));
  };
})