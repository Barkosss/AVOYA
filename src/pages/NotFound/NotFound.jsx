import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {

    return (
        <Layout>
            <div className="notfound-container">
                <div className="notfound-title">
                    404
                </div>

                <div className="notfound-hint">
                    Может всё-таки на главную?
                </div>
                
                <Link to="/">
                    <div className="notfound-btn">
                        На главную
                    </div>
                </Link>
            </div>
        </Layout>
    );
}
