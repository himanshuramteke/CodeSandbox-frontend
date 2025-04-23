import useCreateProject from "../hooks/apis/mutations/useCreateProject"

export const CreateProject = () => {

    const { createProjectMutation } =  useCreateProject()

    async function handleCreateProject() {
       console.log('Going to create project');
       try {
        await createProjectMutation();
        console.log('Project created successfully, Now we should redirect to the editor');
       } catch (error) {
        console.log(error);
       }
       
    }
    return (
        <>
         <button onClick={handleCreateProject}>
            CreateProject
         </button>
        </>
    )
}