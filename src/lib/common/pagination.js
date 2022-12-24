const  getPage = (page)=> {
    let currentPage = page-1;
    const limit = 10;
    let offset = 0;
    if(currentPage < 1){
        return {limit, offset};
    }else {
        offset = currentPage ? currentPage*limit : 0;
        return {limit, offset};
    }
}

module.exports={
    getPage
}