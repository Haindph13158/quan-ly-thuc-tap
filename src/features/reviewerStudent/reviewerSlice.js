import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentAPI from "../../API/StudentAPI";

export const getListStudentAssReviewer = createAsyncThunk(
    'reviewer/getListStudentAssReviewer',
    async (dataForm) => {
        const { data } = await StudentAPI.listStudentAssReviewer(dataForm)
        return data
    }
)

export const updateReviewerListStudent = createAsyncThunk(
    'student/updateReviewerListStudent',
    async (dataForm) => {
        const { data } = await StudentAPI.updateReviewerSudent(dataForm)
        return data
    }
)

const reviewerSlice = createSlice({
    name: "reviewer",
    initialState: {
        loading: false,
        listStudentAssReviewer: [],

    },
    reducers: {
    },
    extraReducers: (builder) => {
        //reviewerListStudent
        builder.addCase(updateReviewerListStudent.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateReviewerListStudent.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateReviewerListStudent.rejected, (state, action) => {
            state.error = 'Update reviewer student fail'
        })

        //getListReviewerStudent
        builder.addCase(getListStudentAssReviewer.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getListStudentAssReviewer.fulfilled, (state, action) => {
            state.loading = false
            state.listStudentAssReviewer = action.payload
        })
        builder.addCase(getListStudentAssReviewer.rejected, (state, action) => {
            state.error = 'get reviewer student fail'
        })
    }
})
export default reviewerSlice.reducer