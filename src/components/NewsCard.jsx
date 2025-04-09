const NewsCard = ({ article }) => {
    return (
        <div className="news-card">
            {article.urlToImage && <img src={article.urlToImage} alt="news" />}
            <h3>{article.title}</h3>
            <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>{article.description ? article.description.substring(0, 100) + "..." : "No description available"}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    );
};

export default NewsCard;
