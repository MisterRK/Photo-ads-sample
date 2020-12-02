console.log(Navigator.geolocation)
fetch("https://api.taboola.com/2.0/json/apitestaccount/recommendations.get", {
	// ? Remove method and headers when performing a GET request
	// ? POST,PATCH must be uppercase
	method: "POST",
	body: JSON.stringify({
		placements: [
			{
				name: "Below Article Thumbnails",
				recCount: 6,
				organicType: "mix",
				thumbnail: { width: 640, height: 480 },
			},
		],
		user: {
			session: "init",
			realip: "24.126.139.0",
			agent:
				"Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64%3B+ServiceUI+13)+AppleWebKit%2F537.36+(KHTML%2C+like+Gecko)+Chrome%2F64.0.3282.140+Safari%2F537.36+Edge%2F17.17134",
			device: "14A7B4BB0B5B63781A90BE1B0F5B6019",
		},
		app: {
			type: "WEB",
			apiKey: "7be65fc78e52c11727793f68b06d782cff9ede3c",
			name: "take-home-challenge",
			origin: "CLIENT",
		},
		view: { id: "a558e7763d614902a3689c69b23c25a7" },
		source: {
			type: "TEXT",
			id: "resources/articles",
			url: "https://blog.taboola.com/digiday-publishing-summit",
		},
	}),
})
	.then((response) => response.json())
	.then((json) => {
		json.placements.map((placement) => {
         console.log(placement);

            let firstRow = document.querySelector(".firstThumbnailRow");
            let secondRow = document.querySelector(".secondThumbnailRow");

            let thumbnailDiv = document.createElement("div");
            let header = document.createElement("h4");
            let thumbnailImg = document.createElement("a");
            let branding = document.createElement('p')

            thumbnailDiv.className = 'thumbnailDiv'
            thumbnailImg.className = 'thumbnailLink'
            header.className = 'thumbnailTitle'
            branding.className = 'thumbnailBranding'

            header.innerHTML = `<a class="thumbnailLink" href="${placement.list[0].url}">${placement.list[0].name}</a>`
            thumbnailImg.innerHTML = `<img class="thumbnailImg" src="${placement.list[0].thumbnail[0].url}" ></img>`
            thumbnailImg.href = placement.list[0].url
            branding.innerHTML = `<a class="thumbnailLink" href="${placement.list[0].url}">${placement.list[0].branding} | ${placement.list[0].categories[0]}</a>`

            thumbnailDiv.append(thumbnailImg, header, branding)

            // determine which row the thumbnail should be in
            if(json.placements.indexOf(placement) <= 2){
               firstRow.append(thumbnailDiv)
            } else {
               secondRow.append(thumbnailDiv)
            }
		});
	});
