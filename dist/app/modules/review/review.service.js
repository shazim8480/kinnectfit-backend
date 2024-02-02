"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const review_model_1 = require("./review.model");
const review_constant_1 = require("./review.constant");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // set review cover when it's not given
    const defaultImg = [];
    defaultImg.push(review_constant_1.defaultReviewCover);
    !payload.review_cover || ((_a = payload.review_cover) === null || _a === void 0 ? void 0 : _a.length) === 0
        ? (payload.review_cover = defaultImg)
        : // eslint-disable-next-line no-self-assign
            (payload.review_cover = payload.review_cover);
    // console.log('usersss', payload.user);
    const isUserExist = yield user_model_1.User.findById(payload.user);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Check the type of review (meal plan or workout)
    if (payload.mealPlan) {
        // User is trying to add a meal plan review
        const existMealPlanReview = yield review_model_1.Review.findOne({
            user: payload.user,
            mealPlan: payload.mealPlan,
        });
        if (existMealPlanReview) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already added review for this meal plan');
        }
    }
    else if (payload.workout) {
        // User is trying to add a workout review
        const existWorkoutReview = yield review_model_1.Review.findOne({
            user: payload.user,
            workout: payload.workout,
        });
        if (existWorkoutReview) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already added review for this workout');
        }
    }
    // Check if App review is add by the same user
    const existAppReview = yield review_model_1.Review.findOne({
        review_type: 'App',
        user: payload.user,
    });
    if (existAppReview) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'App review is already added by this user.');
    }
    // console.log('isUserExist', isUserExist);
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === 'trainer') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Trainer can not give a review');
    }
    const result = (yield review_model_1.Review.create(payload)).populate([
        {
            path: 'workout',
        },
        {
            path: 'mealPlan',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({}).populate([
        {
            path: 'workout',
        },
        {
            path: 'mealPlan',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findById(id).populate([
        {
            path: 'workout',
        },
        {
            path: 'mealPlan',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getReviewsByMealPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { mealPlan: id };
    const result = yield review_model_1.Review.find(query).populate([
        {
            path: 'mealPlan',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getReviewsByWorkout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { workout: id };
    const result = yield review_model_1.Review.find(query).populate([
        {
            path: 'workout',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getReviewsByApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = { review_type: 'App' };
    const result = yield review_model_1.Review.find(query).populate([
        {
            path: 'user',
        },
    ]);
    return result;
});
exports.ReviewService = {
    createReview,
    getAllReviews,
    getSingleReview,
    getReviewsByMealPlan,
    getReviewsByWorkout,
    getReviewsByApp,
};
