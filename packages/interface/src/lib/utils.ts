import { ethers } from 'ethers'

/**
 * Returns a string of form "abc...xyz"
 * @param str string to string
 * @param front number of chars to keep at front
 * @param end number of chars to keep at end
 * @returns ellipsed string
 */
export const shortenAddress = (str = '', front = 5, end = 3) => {
  if (str) {
    return `${str.slice(0, front)}...${str.slice(str.length - end)}`
  }
  return ''
}
