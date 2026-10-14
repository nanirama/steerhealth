import { motion } from 'framer-motion';

const ProgressBar = ({ progress, color }) => {
    return (
        <div className="flex flex-col items-center z-5">
          {/* Circle */}
          
          {/* Progress Bar Gray Container*/}
          <div className="w-8 mt-1 mb-0 rounded-full bg-[#e3ebff]/15 h-full" >
            {/* Progress Bar Blue Fill*/}
            <motion.div className='w-8 rounded-full bg-[linear-gradient(180deg,#2160FD_-52.55%,#E3EBFF_77.61%)]' style={{ height: progress }}>
              <div className='rounded-full h-full' style={{ background: `linear-gradient(to bottom, #2160FD_-52, rgba(30, 64, 175, ${color / 10})`, }}>
              </div>
            </motion.div>
          </div>
        </div>
    );
};

export default ProgressBar;