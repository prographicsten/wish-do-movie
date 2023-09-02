// buttons category functions
const buttonsCategory = async () => {
    const loadButtons = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const btnData = await loadButtons.json()
    
    // button container define
    const buttonsContainer = document.getElementById('buttons_category');

    btnData.data.forEach(category => {
        // console.log(category);

        // create button by createElement
        const button = document.createElement('button');
        button.innerHTML = `
        <button onclick="loadVideoContainer('${category.category_id}')" class="px-7 py-2 rounded-sm bg-[#25252526] text-black font-medium text-base">${category.category}</button>
        `;
        buttonsContainer.appendChild(button);
    });
    
};


// load video container from (videos_container) element ID
const loadVideoContainer = async (categoryId) => {
    // console.log(categoryId);

    // load category_id fetch
    const loadVideos = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const videoData = await loadVideos.json();
    // console.log(videoData.data);

    // video container definition by id (videos_container)
    const videoContainerDefinition = document.getElementById('videos_container');
    videoContainerDefinition.innerHTML = '';

    videoData.data.forEach(cateVideo => {
        console.log(cateVideo);
        console.log(cateVideo.authors[0].profile_picture);

        // create video container div with createElement
        const singlevideoContent = document.createElement('div');
        singlevideoContent.classList = 'bg-gray-50 mb-4 md:mb-5 lg:mb-5 xl:mb-5 rounded-lg';
        singlevideoContent.innerHTML = `
        <div class="mb-5">
            <img class="w-full h-[220px] rounded-t-lg" src="${cateVideo?.thumbnail}" alt="">
            <p class="font-normal text-xs float-right text-white relative -mt-12 mr-5 bg-black py-2 px-5 rounded"><span>3</span>hrs <span>50</span>min <span>ago</span></p>
        </div>
        <div class="flex  gap-5 items-start px-2 pt-3 pb-5">
            <img class="w-10 h-10 rounded-full" src="${cateVideo?.authors[0].profile_picture}" alt="">
            <div >
                <h2 class="text-base text-[#171717] font-bold mb-1">${cateVideo.title}</h2>
                <p class="text-sm font-normal mb-1">${cateVideo?.authors[0].profile_name}</p>
                <p class="text-sm font-normal">${cateVideo?.others.views}</p>
            </div>
        </div>
        `;
        videoContainerDefinition.appendChild(singlevideoContent);
    });

};

loadVideoContainer("1000")

buttonsCategory();