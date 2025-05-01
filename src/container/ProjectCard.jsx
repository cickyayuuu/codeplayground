import React from 'react'
import {motion} from 'framer-motion'

const ProjectCard = ({project,index}) => {
  
  return (
    <motion.div key={index} className='w-full cursor-pointer md:w-[377px] h-[278px]  rounded-md p-1 flex flex-col items-center justify-center gap-2' style={{backgroundColor:"#a979ff"}}>
       <div className=" w-full h-full rounded-md overflow-hidden" style={{backgroundColor: "gray"}} >
            <iframe
              title="Result"
              srcDoc={project.output}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                
              }}
            />
          </div>
     
    </motion.div>
  )
}

export default ProjectCard
