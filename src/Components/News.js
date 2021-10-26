import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import { PropTypes } from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country : "in",
    category : "general"
  }

  static propTypes = {
    country:PropTypes.string,
    category:PropTypes.string
  }

  articles = [
    {
    //   source: {
    //     id: "bbc-sport",
    //     name: "BBC Sport",
    //   },
    //   author: "BBC Sport",
    //   title: "ECB gives 'conditional' Ashes approval",
    //   description:
    //     'England men\'s Ashes series in Australia this winter will go ahead "subject to several critical conditions", says the England and Wales Cricket Board.',
    //   url: "http://www.bbc.co.uk/sport/cricket/58788750",
    //   urlToImage:
    //     "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
    //   publishedAt: "2021-10-08T17:07:27.878367Z",
    //   content:
    //     'England men\'s Ashes series in Australia this winter will go ahead "subject to several critical conditions", says the England and Wales Cricket Board. \r\nEngland had concerns over their families being … [+2042 chars]',
    // },
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //   description:
    //     "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //   publishedAt: "2020-04-27T11:41:47Z",
    //   content:
    //     "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    // },
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //   description:
    //     "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //   publishedAt: "2020-03-30T15:26:05Z",
    //   content:
    //     "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    }
  ];

  constructor() {
    super();
    console.log("Hello I am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page:1
    };
  }

  //Runs after render
    async componentDidMount(){
        // console.log("CDM");
        
        let url =
          `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cc368e5748a04da5b15464dd5718cab2&page=1&pageSize=9`;
        this.setState({
          loading: true,
        });
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    }

    handlePrevClick = async ()=>{
        if(this.state.page>1){
            let url =
            `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cc368e5748a04da5b15464dd5718cab2&page=${this.state.page-1}&pageSize=12`;
            this.setState({
              loading:true
            })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page:this.state.page-1,
                articles:parsedData.articles,
                loading:false
            })
            }
        }
    handleNextClick = async ()=>{
        if(!(this.state.page+1> Math.ceil(this.state.totalResults/12))){
        let url =
          `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cc368e5748a04da5b15464dd5718cab2&page=${this.state.page+1}&pageSize=12`;
        this.setState({
          loading:true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
        })
        }
    }

  render() {
    return (
      <div className="container my-3" >
        <h1 className="my-5 text-center">Today's Top HeadLines</h1>
        {this.state.loading && <Spinner />}
        <div className="d-flex justify-content-between flex-wrap">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              // console.log("Articles :",this.state.articles)
              return (
                <div
                  className="my-2 shadow-lg p-3 mb-5 bg-body rounded"
                  key={element.url}
                >
                  <NewsItem
                    style={{ border: "none" }}
                    title={element.title}
                    description={element.description}
                    imageURL={element.urlToImage}
                    newsURL={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between my-3 mx-5">
          <button
            type="button"
            disabled={this.state.page <= 1 ? true : false}
            onClick={this.handlePrevClick}
            className="btn btn-warning"
          >
            &#8592; Prev
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 12)
                ? true
                : false
            }
            onClick={this.handleNextClick}
            className="btn btn-warning"
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}
