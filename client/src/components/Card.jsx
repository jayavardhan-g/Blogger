import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

const animation = {
  initial: {},
  final: {
    scale: 1.05,
    zIndex: 40,
    transition: {
      duration: 0.2,
    },
  },
};

const Card = (props) => {
  return (
    <Link to={`/blogs/${props.id}`}>
      <motion.div
        variants={animation}
        initial="initial"
        whileHover="final"
        className="w-full m-3 max-w-xs overflow-hidden   bg-white rounded-lg shadow-lg "
      >
        <img
          className="object-cover object-center w-full h-44"
          src={props.img}
          alt="Image"
        />

        <div className="flex items-center px-6 py-3  bg-gray-900">
          <h1 className="mx-3 text-lg font-semibold  text-white">
            {props.tags?.map((e) => `#${e} `)}
          </h1>
        </div>

        <div className="px-6 pt-2">
          <h1 className="text-xl font-semibold  text-gray-800 ">
            {props.title}
          </h1>

          <p
            className="py-2  text-gray-700 text-sm "
            dangerouslySetInnerHTML={{ __html: props.content?.slice(0, 250) }}
          ></p>
        </div>
        <div className="flex p-2  w-full justify-between">
          <div className="text-xs mx-2 text-center">
            {props.date.slice(0,10)}
          </div>
          <div className="mx-1 text-center">
            {props.author?`~ ${props.author}`:""}
          </div>
        </div>
        
      </motion.div>

    </Link>
  );
};
export default Card;
