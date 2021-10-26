import React from 'react'

// export class NewsItem extends Component {
//     render() {
  const NewsItem =(props)=>{
        let {title,description,imageURL,newsURL,author,date} = props;
        return (
          <div>
            <div className="card" style={{ width: "18rem", border:"none" }}>
              <img
                src={
                  imageURL
                    ? imageURL
                    : "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="
                }
                className="card-img-top"
                alt="Not Available..."
              />
              <div className="card-body">
                <p class="card-text">
                  <small class="text-muted">
                    Author : {author ? author : "Unknown"}
                  </small>
                  <br/>
                  <small class="text-muted">
                    Date : {new Date(date).toGMTString()}
                  </small>
                </p>
                <h5 className="card-title">
                  {title ? title.slice(0, 45) : ""}...
                </h5>
                <p className="card-text">
                  {description ? description.slice(0, 80) : ""}...
                </p>
                <a
                  href={newsURL}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-sm btn-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
    }

export default NewsItem
