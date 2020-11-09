window.addEventListener('load', async () => {

    const feedRes = await fetch("/feed");
    const feedDat = await feedRes.json();
    if (!feedRes.ok) {
        console.log(feedRes.error);
        return;
    }

    

    // document.getElementById('button').addEventListener('click', () => {

    // });

    const response = await fetch("/feed/save", {
                    method: 'POST',
                    body: JSON.stringify( { 
                        "name": name, 
                        "word": word, 
                        "score": currScore
                    })
                });
                if (!response.ok) {
                    console.log(response.error);
                    return;
                }
});

//like button -> should each one have a unique id, wouldn't that be a hassle?
