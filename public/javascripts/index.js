function nextPage(){
    let newPageNumber = getPageNumber() + 1;
    console.log(newPageNumber);
    window.location.href = '/p/'+newPageNumber;
    return;
}
function prevPage(){
    let newPageNumber = getPageNumber() - 1;
    if (newPageNumber < 1){
        return;
    }
    else{
        window.location.href = '/p/'+newPageNumber;
    }
    
}
function getPageNumber(){
    //Find the number x in the url segment "/p/x"
    const pageRegEx = /\/p\/([0-9])\d*/
    let pageURL = window.location.href;
    let pageNumber = pageRegEx.exec(pageURL)
    //If on index page (and RegEx returns null)
    if (pageNumber === null){
        return 1;
    }
    else{
        let pageString = pageNumber[0].trim().replace('/p/','');
        return parseInt(pageString);
    }
}