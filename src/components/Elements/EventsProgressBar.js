import { motion } from 'framer-motion';

const EventProgressBar = ({ progress, color }) => {
    return (
        <div className="flex flex-col items-center my-20 mx-10">
          {/* Circle */}
          <div className="w-4 h-4 bg-blue-800 rounded-full absolute"></div>
          {/* Progress Bar Gray Container*/}
          <div className="w-2 my-0 rounded-full bg-gray-200 h-full" >
            {/* Progress Bar Blue Fill*/}
            <motion.div className='w-2 rounded-full bg-blue-500 ' style={{ height: progress }}>
              <div className='rounded-full h-full' style={{ background: `linear-gradient(to bottom, rgba(30, 64, 175, 1), rgba(30, 64, 175, ${color / 10})`, }}>
              </div>
            </motion.div>
          </div>
        </div>
    );
};

export default EventProgressBar;