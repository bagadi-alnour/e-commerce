import React from "react";
import { Helmet } from "react-helmet";
function about() {
  return (
    <div className="container my-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | About</title>
      </Helmet>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 text-justify">
          <h3 className="my-2">AZrica</h3>
          <p>
            AZrica is an e-commerce for purchasing hard-to-find African cuisine
            products , we based in France but our services will be around Europe
            very soon.
          </p>
          <p>
            We are specialized in providing African cuisine ingredients in
            general and Sudanese cuisine ingredients in particular and make them
            available in only few clicks. One of the reasons of our existing is
            the difficulties that we face in our daily life, as Sudanese person
            abroad, is to find the right ingredients for your recipe, AZrica is
            here to help you get exactly what you want in reasonable price
            avoiding the hassle bustle of going to the grocery
          </p>
          <p>
            AZrica created and owned by{" "}
            <a href="http://www.bagadi-alnour.com">Bagadi Alnour</a>, a Sudanese
            web developer passionate about Sudanese cuisine and absolutely in
            love with foods
          </p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 my-4">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5df942d9c0c2523aaff04528/1576619499715-F9EYGM5YTOKY0SJ44D7V/ke17ZwdGBToddI8pDm48kDHPSfPanjkWqhH6pl6g5ph7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwONMR1ELp49Lyc52iWr5dNb1QJw9casjKdtTg1_-y4jz4ptJBmI9gQmbjSQnNGng/3.08_TERANGA_1929.jpg"
            className="img-fluid"
            alt="AZrica"
          />{" "}
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 my-2">
          <h3 className="mt-2">Our products</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            provident soluta error beatae quas quo eveniet totam autem libero
            pariatur recusandae, explicabo commodi assumenda quae numquam? Ipsa
            iste mollitia similique.
          </p>
          <img
            src="https://blog.obiaks.com/uploadsblog/190327033603.jpg"
            className="img-fluid"
            alt="AZrica"
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 my-2">
          <p>
            este pur şi simplu o machetă pentru text a industriei tipografice.
            Lorem Ipsum a fost macheta standard a industriei încă din secolul al
            XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a
            amestecat pentru a crea o carte demonstrativă pentru literele
            respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a
            facut saltul în tipografia electronică practic neschimbată. A fost
            popularizată în anii '60 odată cu ieşirea colilor Letraset care
            conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de
            publicare pentru calculator, ca Aldus PageMaker care includeau
            versiuni de Lorem Ipsum.
          </p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 my-2">
          <h3 className="my-3">Contact AZrica</h3>
          <p>
            You can contact us from 9:30 am to 20:00 pm Monday - Friday by
            calling this number :<strong> 00 33 (0) 6 05 53 40 55</strong>{" "}
            <br />
            Sending us an email to <strong> bagadi.alnour@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default about;
