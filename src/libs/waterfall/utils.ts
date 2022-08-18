/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-07-25 00:35:07
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-07-25 13:59:57
 * @FilePath     : \web-C-tmp\src\libs\waterfall\utils.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */

// 从 itemElement 中抽离出所有的 imgElements
export const getImgElements = (itemElements: HTMLElement[]) => {
    const imgElements: HTMLImageElement[] = []
    itemElements.forEach((el: HTMLElement) => {
        imgElements.push(...Array.from(el.getElementsByTagName('img')))
    })
    return imgElements
}

// 生成所有的图片链接数组
export const getAllImg = (imgElements: HTMLImageElement[]) => {
    return imgElements.map((imgElement: HTMLImageElement) => {
        return imgElement.src
    })
}

interface PResolve {
    img: string,
    index: number
}

// 监听图片数组加载完成(promise)
export const onComplateImgs = (imgs: string[]) => {
    const promiseAll: Promise<PResolve>[] = []
    imgs.forEach((img, index) => {
        promiseAll[index] = new Promise((resolve, reject) => {
            const imageObj = new Image()
            imageObj.src = img
            imageObj.onload = () => {
                resolve({
                    img,
                    index,
                })
            }
        })
    })
    return Promise.all(promiseAll)
}

// 返回列高对象中最小的高度
export const getMinHeight = (columnHeightObj: any) => {
    const columnHeightArr: number[] = Object.values(columnHeightObj)
    return Math.min(...columnHeightArr)
}

// 返回列高对象中最大的高度
export const getMaxHeight = (columnHeightObj: any) => {
    const columnHeightArr: number[] = Object.values(columnHeightObj)
    return Math.max(...columnHeightArr)
}

// 返回列高对象中最小高度所在的列
export const getMinHeightColumn = (columnHeightObj: any) => {
    const minHeight = getMinHeight(columnHeightObj)
    return Object.keys(columnHeightObj).find((key) => {
        return columnHeightObj[key] === minHeight
    })
}
