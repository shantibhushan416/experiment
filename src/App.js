import { useEffect, useState } from "react";
import Select from "react-select"
import DataTableBase from "./DataTable";
import { getBranches, getCoursebyId, postBranches, postCourse, updateCoursebyId } from "./service";
import './App.css';
import SignIn from "./auth/SignIn";

function App() {

  const initialValues = {
    course: '',
    author: "",
    branch: null,
  };

  const [values, setValues] = useState(initialValues);
  const [Id, setId] = useState();
  const [getBranchList, setGetBranchList] = useState([]);
  const [newBranch, setNewBranch] = useState("");
  const [open, setOpen] = useState(false)




  useEffect(() => {
    onGetBranchList();
  }, [])




  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { course, author, branch } = values;

    const data = { course, author, branch: branch?.value };

    const response = await postCourse(data)

  };


  const onGettingCoursebyId = async (id) => {
    const response = await getCoursebyId(id);
    const { course, author, branch } = response;

    const selectedBranch = { label: branch.name, value: branch._id };

    const newData = { course, author, branch: selectedBranch };


    setValues(newData);
    setId(id);
  }

  const onEditting = async (e) => {
    e.preventDefault();

    const { course, author, branch } = values;

    const data = { course, author, branch: branch?.value };
    const response = await updateCoursebyId(Id, data);
    if (response) {
      setId("")
      window.location.reload(true);
    }
  };



  //////////////////////////////// Getting Branch ////////////////////////////////

  const onGetBranchList = async () => {
    const response = await getBranches();
    const branchList = response.map(({ _id, name }) => {
      return { label: name, value: _id };
    });
    setGetBranchList(branchList);

  };

  const onHandleOpen = () => {
    setOpen(true)
  };

  const onAddingBranch = async () => {
    const response = await postBranches(newBranch)
    if (response.status === 200) onGetBranchList();

  };


  return (
    <div className="App">
      <header className="App-header">
        <div>


          <form onSubmit={handleSubmit}>

            <input placeholder="course" name="course" value={values.course} onChange={handleChange} />
            <input placeholder="author" name="author" value={values.author} onChange={handleChange} />
            <Select
              onChange={(value, { name }) =>
                handleChange({ target: { name, value } })
              }
              style={{ color: "primary" }}
              name="branch"
              placeholder="Enter Branch Name"
              value={values.branch}
              options={getBranchList}
              isClearable={true}
            />


            <button type="submit">Submit</button>
            <button onClick={onEditting}>Update</button>
          </form>

          {open && <>
            <input placeholder="Add Branch" onChange={(e) => setNewBranch(e.target.value)} /><button onClick={onAddingBranch}>OK</button>
          </>}
          <button onClick={onHandleOpen}>Add Branch</button>
          <SignIn />
        </div>
        <DataTableBase clicked={onGettingCoursebyId} />
      </header>
    </div>
  );
}

export default App;
