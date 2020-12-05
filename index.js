fetch("https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init", {
})
	.then((response) => response.json())
	.then((json) => {
		json.list.map((listItem) => {

			let firstRow = document.querySelector(".firstThumbnailRow");
			let secondRow = document.querySelector(".secondThumbnailRow");

			let thumbnailDiv = document.createElement("div");
			let header = document.createElement("h4");
			let thumbnailImg = document.createElement("a");
			let branding = document.createElement("p");

			thumbnailDiv.className = "thumbnailDiv";
			thumbnailImg.className = "thumbnailLink";
			header.className = "thumbnailTitle";
			branding.className = "thumbnailBranding";

			header.innerHTML = `<a class="thumbnailLink" href="${listItem.url}">${listItem.name}</a>`;
			thumbnailImg.innerHTML = `<img class="thumbnailImg" src="${listItem.thumbnail[0].url}" ></img>`;
			thumbnailImg.href = listItem.url;
			branding.innerHTML = `<a class="thumbnailLink" href="${listItem.url}">${listItem.branding} | ${listItem.categories[0]}</a>`;

			thumbnailDiv.append(thumbnailImg, header, branding);

			// determine which row the thumbnail should be in
			if (json.list.indexOf(listItem) <= 2) {
				firstRow.append(thumbnailDiv);
			} else {
				secondRow.append(thumbnailDiv);
			}
		});
	});
