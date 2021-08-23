'use strict';
const course = [
  // 1 obj = 1 chap-content
  // 1 chap-content = * articles
  // 1 article = 1 title + * art-content
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
    content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel.",
    // If there's no subpart : content is a string --> to keep
    // content: [ 
    //   { title: "", content: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio earum, repudiandae voluptates porro, corrupti sunt assumenda natus blanditiis rem rerum itaque, consequuntur cumque veritatis veniam dolore deleniti nisi optio sapiente! Neque molestiae rem quia commodi pariatur provident voluptates. Excepturi deleniti hic obcaecati animi perspiciatis ipsam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error eveniet eos ullam, non iusto, maiores dolor numquam dicta amet vitae commodi pariatur doloribus corrupti, dolorem beatae temporibus vel."} ],
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
      elem.innerHTML = textContent.outerHTML;
    }
  }
  return elem;
};

// For each Chapter of the Course:
// - Fill in course-menu with menu-chap-container
// - Create Part Articles : will be displayed when Part Link clicked in menu-chap-container

const makeCourseArticle = (articleTtl, articleContent) => {
  const course = createElem('section', null, 'course-content');
  [ createElem('h1', articleTtl), createElem('p', articleContent)]
    .forEach((el) => {
      course.appendChild(el);
    });
  return course;
};

const makeArticleListeningLink = (type, title, content) => {
  let articleLink = createElem('a', title, 'title-link');
  
  if (type === 'chap') { // 2nd (only other) type = 'article'
    articleLink = createElem('h3', createElem('a', title), 'chap-header');
  }
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

const makeToggableTitlesWithBtn = (articleLinks = []) => {
  const titlesContainer = createElem('div', null,'titles-container');
  titlesContainer.setAttribute('data-is-toggled', false);
  const toggleBtn = createElem('button', 'Toggle', 'toggle-btn');
  toggleBtn.addEventListener('click', () => {
    if(titlesContainer.dataset.isToggled != 'true'
    || !titlesContainer.dataset.isToggled) {
      articleLinks.forEach((link) => {
        titlesContainer.dataset.isToggled = 'true';
        titlesContainer.appendChild(link);
      });
    } else {
      articleLinks.forEach((link) => {
        titlesContainer.dataset.isToggled = 'false';
        titlesContainer.removeChild(link)
      });
    };
  });
  return {
    btn: toggleBtn,
    titlesContainer: titlesContainer,
  };
};

const makeMenuChapContainer = (chapTitle, toggableTitles) => {
  const chapContainer = createElem('div', null, 'menu-chap-container');
  if (!toggableTitles) {
    return chapContainer.appendChild(chapTitle);
  }
  const chapHeader = createElem('h3', chapTitle, 'chap-header');
  chapHeader.appendChild(toggableTitles.btn);
  chapContainer.appendChild(chapHeader);
  chapContainer.appendChild(toggableTitles.titlesContainer);
  return chapContainer;
};

const displayArticleFromMenuTitle = () => {

};

const handleChapter = (chap) => {
  if (typeof chap.content === 'string' 
      || !chap.content) {
      return makeArticleListeningLink('chap', chap.chapTitle, chap.content); 
  } else {
    const linksC = chap.content
      .map((cc) => makeArticleListeningLink('article', cc.title, cc.content));
    const toggableC = makeToggableTitlesWithBtn(linksC); 
    return makeMenuChapContainer(chap.chapTitle, toggableC);
  }
};

document.addEventListener("readystatechange", (e) => { //see tjs book p. 184
  if(document.readyState == "interactive") {
    const menu = document.querySelector('.course-menu');
    // fetch data here
    const chapsC = course
      .map((chap) => handleChapter(chap));
    chapsC
      .forEach((cm) => menu.appendChild(cm));
  };
});