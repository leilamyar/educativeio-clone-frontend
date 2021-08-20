'use strict';
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

// Helper fn

// TODO: refactor FP with named args ?
const createElem = (typeString, 
  textContent = null, 
  className = null) => {
  // console.log('Creating an element with values:');
  // console.log('type =', typeString);
  // console.log(', content =', textContent);
  // console.log(', className =', className);
  // console.log(', attributes =', attributes);

  const elem = document.createElement(typeString);
  // Set class
  if (className) {
    elem.className += (className);
  }
  // Set innerText OR innerHTML
  if (!textContent) {
    return elem;
  } else {
    if (typeof textContent == 'string') {
      elem.innerText = textContent;
    } else {
      elem.innerHtml = textContent;
    }
  }
  return elem;
};

// For each Chapter of the Course:
// - Fill in course-menu with menu-chap-container
// - Create Part Articles : will be displayed when Part Link clicked in menu-chap-container

const makeCourseArticle = (partTitle, partContent) => {
  const course = createElem('section', null, 'course-content');
  [ createElem('h1', partTitle), createElem('p', partContent)]
    .forEach((el) => {
      course.appendChild(el);
    });
  return course;
};

const makeArticleListeningLink = (title, content) => {
  const articleLink = createElem('a', title, 'toggable-parts-container');
  
  articleLink.addEventListener('click', () => {
    // Find if already displayed article 
    // & removes it from DOM
    const found = document.getElementsByClassName('course-content');
    if (found) {
      for (const f of found) {
        f.parentNode.removeChild(f);
        console.log('REMOVED --> found:', found.length)
      }
    }
    // Then display newly clicked article
    const courseContainer = document.querySelector('.chap-content-container');
    courseContainer
      .appendChild(makeCourseArticle(title, content));
  });
  return articleLink;
};

const makeToggableArticleList = (articleLinks = []) => {
  const toggableContainer = createElem('div', null,'toggable-parts-container');
  toggableContainer.setAttribute('data-is-toggled', false);

  const toggleBtn = createElem('button', 'Toggle', 'toggle-btn');
  
  toggleBtn.addEventListener('click', () => {
    if(toggableContainer.dataset.isToggled != 'true') {
      // console.log(toggableContainer)
      articleLinks.forEach((link) => {
        toggableContainer.dataset.isToggled = 'true';
        toggableContainer.appendChild(link);
      });
    } else {
      articleLinks.forEach((link) => {
        toggableContainer.dataset.isToggled = 'false';
        toggableContainer.removeChild(link)
      });
    };
  });

  toggableContainer.appendChild(toggleBtn);
  // articleLinks.forEach((link) => toggableContainer.appendChild(link));

  return toggableContainer;
};

const makeMenuChapContainer = (chapTitle, toggableContainer) => {
  const chapContainer = createElem('div', null, 'menu-chap-container');
  chapContainer.appendChild(createElem('h3', chapTitle));
  // console.log(chapContainer)
  // console.log(toggableContainer)
  chapContainer.appendChild(toggableContainer);
  return chapContainer;
};

document.addEventListener("readystatechange", (e) => { //see tjs book p. 184
  if(document.readyState == "interactive") {
    const menu = document.querySelector('.course-menu');



    // For each part of a course's chapter
    const chapTtl = 'Chap title';
    const t = 'some title';
    const cc = 'some content for course';
    // Make a link for part (add it to menu-chap-container, after chap-title in menu)
    // FAKE : added to menu without chap-container:
    // const menu = document.querySelector('.course-menu');
    // menu.appendChild(makeArticleListeningLink(t, cc));
    
    const toggableMenuTitles = makeToggableArticleList([makeArticleListeningLink(t, cc)]);
    // console.log(toggableMenuTitles)

    const chapMenu = makeMenuChapContainer(chapTtl, toggableMenuTitles);

    console.log(chapMenu)

    
    menu.appendChild(makeMenuChapContainer(chapTtl, toggableMenuTitles));

    // fetch data here
    // fetchedContent
      // .map((c) => makeMenuChapContainer(c))
      // .forEach((cc) => courseMenu.appendChild(cc));
  };
});