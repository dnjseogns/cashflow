export const CF_SAVE = "@@CASHFLOWMAKER/SAVE";
export const CF_CLEAN = "@@CASHFLOWMAKER/CLEAN";

export const CfSave = (data) => ({
    type : CF_SAVE,
    payload : data
});

export const CfClean = () => ({
   type : CF_CLEAN
});