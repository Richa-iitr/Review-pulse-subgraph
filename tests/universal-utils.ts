import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  productReviewed,
  thresholdChanged
} from "../generated/Universal/Universal"

export function createproductReviewedEvent(
  productId: BigInt,
  sender: Address
): productReviewed {
  let productReviewedEvent = changetype<productReviewed>(newMockEvent())

  productReviewedEvent.parameters = new Array()

  productReviewedEvent.parameters.push(
    new ethereum.EventParam(
      "productId",
      ethereum.Value.fromUnsignedBigInt(productId)
    )
  )
  productReviewedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return productReviewedEvent
}

export function createthresholdChangedEvent(
  threshold: BigInt
): thresholdChanged {
  let thresholdChangedEvent = changetype<thresholdChanged>(newMockEvent())

  thresholdChangedEvent.parameters = new Array()

  thresholdChangedEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )

  return thresholdChangedEvent
}
