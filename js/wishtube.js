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
        <button onclick="loadVideoContainer('${category.category_id}')" class="mx-[5px] my-2 md:my-0 lg:my-0 xl:my-0 md:mx-0 lg:mx-0 xl:mx-0 px-3 md:px-5 lg:px-7 py-2 rounded-sm bg-[#25252526] text-black font-medium text-base hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
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
    const videoDataLoading = videoData.data.length;
    // console.log(videoData.data);
    
    // no content available
    const noVideoAvailable = document.getElementById('no_content_available');
    noVideoAvailable.innerHTML = '';

    // video container definition by id (videos_container)
    const videoContainerDefinition = document.getElementById('videos_container');
    videoContainerDefinition.innerHTML = '';


    if(videoDataLoading > 0) {
        videoData.data.forEach(cateVideo => {
            console.log(cateVideo?.others.views.split( " "));
            const allSeconds = cateVideo.others.posted_date;
            const allSecondsParseFloat = parseFloat(allSeconds);
            const seconds = allSecondsParseFloat;

            // =================================================
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);



            // =================================================
    
            // create video container div with createElement
            const singlevideoContent = document.createElement('div');
            singlevideoContent.classList = 'bg-gray-50 mb-4 md:mb-5 lg:mb-5 xl:mb-5 rounded-lg';
            singlevideoContent.innerHTML = `
            <div class="mb-5">
                <img class="w-full h-[220px] rounded-t-lg" src="${cateVideo?.thumbnail}" alt="">
                ${hours && minutes ? `<p class="font-normal text-xs float-right text-white relative -mt-12 mr-5 bg-black py-2 px-5 rounded">${hours}hrs ${minutes}min ago</p>` : ""}
            </div>
            <div class="flex  gap-5 items-start px-2 pt-3 pb-5">
                <img class="w-10 h-10 rounded-full" src="${cateVideo?.authors[0].profile_picture}" alt="">
                <div >
                    <h2 class="text-base text-[#171717] font-bold mb-1">${cateVideo.title}</h2>
                    <span class="grid grid-cols-2 gap-3">
                        <p class="text-sm font-normal mb-1">${cateVideo?.authors[0].profile_name}</p> 
                        <p>${cateVideo?.authors[0]?.verified ? `<img class="w-5 h-5 rounded-full" src="img/icons8-verified-48.png" alt="">` : ""}</p>
                    </span>
                    <p class="text-sm font-normal">${cateVideo?.others.views}</p>
                </div>
            </div>
            `;
            videoContainerDefinition.appendChild(singlevideoContent);
        });
    }else if((videoDataLoading === 0 ? true : null)) {
        const zeroVideoContainer = document.createElement('div');
        zeroVideoContainer.classList = `w-full py-20 flex-col justify-center items-center text-center`;
        zeroVideoContainer.innerHTML = `
        <img class="mx-auto mb-5" src="Icon.png" alt="">
        <h2 class=" md:text-2xl lg:text-3xl text-[#171717] font-bold">Oops!! Sorry, <br> There is no content here</h2>
        `;
        noVideoAvailable.appendChild(zeroVideoContainer);
    }

};

loadVideoContainer("1000")

buttonsCategory();