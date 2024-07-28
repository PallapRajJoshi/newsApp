import React from 'react';
const NewsItem =(props)=> {


    

        let { title, description, imageUrl, newsUrl, auther, date, source } =props;
        return (
            <div className="my-3">

                <div className="card" style={{ width: "18rem" }}>
                    <div style={   {display:'flex',
                        justifyContent:'flex-end',
                        position:'absolute',
                        right:'0'
                        }}>
                    <span className="  badge rounded-pill bg-danger" >
                        {source}
                        
                    </span></div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>

                        <p className="card-text">
                            {description}...
                        </p>
                        <p className="card-text"><small className="text-body-secondary">By {!auther ? "Unknown" : auther} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More </a>
                    </div>
                </div>




            </div>

        )
    }


export default NewsItem