import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // fetching scroll more 

  const fetchMoreData = async () => {
  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${ page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)




  };



  const capatilizeFirstLetter = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // document.title = `${ capatilizeFirstLetter( props.category)} - NewsMonkey`;
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${ page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(true);

    props.setProgress(100);

  }

  // run after render

  useEffect(() => {
    updateNews();
  }, [])



  const handleNextClick = async () => {

    setPage( page + 1)

    updateNews();
  }

  const handlePreviousClick = async () => {

    setPage( page - 1)


    updateNews();
  }






  return (
    <div className="container my-3">

      <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey -Top  {capatilizeFirstLetter(props.category)} Headlines </h1>

      <hr />
      <InfiniteScroll dataLength={ articles.length}
        next={fetchMoreData}
        hasMore={ articles.length !==  totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="container">
          <div className="row">

            { articles.map((element) => {

              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ''} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} auther={element.auther} date={element.publishedAt} source={element.source.name} />

              </div>

            })}

          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={  page <= 1} type="button" className="btn btn-dark" onClick={ handlePreviousClick}>&larr; Previous</button>
          <button disabled={  page + 1 > Math.ceil(  totalResults /  props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={ handleNextClick}>Next &rarr;</button>
// 
        </div> */}

    </div>

  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}


News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,

  category: PropTypes.string
}

export default News